-- Create profiles table to store user information
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  user_type TEXT NOT NULL CHECK (user_type IN ('owner', 'seeker')),
  phone_number TEXT,
  display_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  rating FLOAT DEFAULT 0,
  total_reviews INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_delete_own" ON public.profiles FOR DELETE USING (auth.uid() = id);

-- Create parking slots table (owned by owners)
CREATE TABLE IF NOT EXISTS public.parking_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  location_address TEXT NOT NULL,
  latitude FLOAT,
  longitude FLOAT,
  price_per_hour FLOAT NOT NULL,
  size TEXT NOT NULL CHECK (size IN ('compact', 'regular', 'large')),
  available BOOLEAN DEFAULT TRUE,
  amenities TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.parking_slots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "slots_select_all" ON public.parking_slots FOR SELECT USING (TRUE);
CREATE POLICY "slots_insert_own" ON public.parking_slots FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "slots_update_own" ON public.parking_slots FOR UPDATE USING (auth.uid() = owner_id);
CREATE POLICY "slots_delete_own" ON public.parking_slots FOR DELETE USING (auth.uid() = owner_id);

-- Create parking slot instances (specific time slots)
CREATE TABLE IF NOT EXISTS public.slot_instances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slot_id UUID NOT NULL REFERENCES public.parking_slots(id) ON DELETE CASCADE,
  owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'booked', 'reserved')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.slot_instances ENABLE ROW LEVEL SECURITY;

CREATE POLICY "slot_instances_select_all" ON public.slot_instances FOR SELECT USING (TRUE);
CREATE POLICY "slot_instances_insert_own" ON public.slot_instances FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "slot_instances_update_own" ON public.slot_instances FOR UPDATE USING (auth.uid() = owner_id);
CREATE POLICY "slot_instances_delete_own" ON public.slot_instances FOR DELETE USING (auth.uid() = owner_id);

-- Create bookings/requests table
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slot_instance_id UUID NOT NULL REFERENCES public.slot_instances(id) ON DELETE CASCADE,
  seeker_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  owner_id UUID NOT NULL REFERENCES public.parking_slots(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'completed', 'cancelled')),
  vehicle_info TEXT,
  notes TEXT,
  total_price FLOAT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "bookings_select_own_or_involved" ON public.bookings FOR SELECT USING (
  auth.uid() = seeker_id OR auth.uid() = owner_id
);
CREATE POLICY "bookings_insert_seeker" ON public.bookings FOR INSERT WITH CHECK (auth.uid() = seeker_id);
CREATE POLICY "bookings_update_status" ON public.bookings FOR UPDATE USING (
  auth.uid() = owner_id OR auth.uid() = seeker_id
);
CREATE POLICY "bookings_delete_own" ON public.bookings FOR DELETE USING (auth.uid() = seeker_id);

-- Create notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('booking_request', 'booking_accepted', 'booking_rejected', 'booking_completed')),
  related_booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "notifications_select_own" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "notifications_insert_system" ON public.notifications FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "notifications_update_own" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);
