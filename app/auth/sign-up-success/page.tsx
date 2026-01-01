import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Check Your Email</CardTitle>
            <CardDescription>We sent a confirmation link to your email</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Please check your email and click the confirmation link to verify your account. This helps us keep your
                account secure.
              </p>

              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm">
                  Didn&apos;t receive the email? Check your spam folder or{" "}
                  <Link href="/auth/sign-up" className="text-primary hover:underline font-semibold">
                    try signing up again
                  </Link>
                </p>
              </div>

              <Link href="/auth/login" className="block">
                <Button className="w-full bg-transparent" variant="outline">
                  Back to Login
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
