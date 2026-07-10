import { Form } from "@adonisjs/inertia/react"

type SignupFormErrors = {
  fullName?: string
  email?: string
  password?: string
  passwordConfirmation?: string
}

export default function Signup() {
  return (
    <div className="form-container">
      <div>
        <h1> Signup </h1>
        <p>Enter your details below to create your account</p>
      </div>

      <div>
        <Form route="new_account.store">
          {({ errors }) => {
            const formErrors = errors as SignupFormErrors

            return (
              <>
                <div>
                  <label htmlFor="fullName">Full name</label>
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    data-invalid={formErrors.fullName ? "true" : undefined}
                  />
                  {formErrors.fullName && <div>{formErrors.fullName}</div>}
                </div>

                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    data-invalid={formErrors.email ? "true" : undefined}
                  />
                  {formErrors.email && <div>{formErrors.email}</div>}
                </div>

                <div>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="new-password"
                    data-invalid={formErrors.password ? "true" : undefined}
                  />
                  {formErrors.password && <div>{formErrors.password}</div>}
                </div>

                <div>
                  <label htmlFor="passwordConfirmation">Confirm password</label>
                  <input
                    type="password"
                    name="passwordConfirmation"
                    id="passwordConfirmation"
                    autoComplete="new-password"
                    data-invalid={formErrors.passwordConfirmation ? "true" : undefined}
                  />
                  {formErrors.passwordConfirmation && <div>{formErrors.passwordConfirmation}</div>}
                </div>

                <div>
                  <button type="submit" className="button">
                    Sign up
                  </button>
                </div>
              </>
            )
          }}
        </Form>
      </div>
    </div>
  )
}
