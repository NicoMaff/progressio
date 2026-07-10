import { Form } from "@adonisjs/inertia/react"

type LoginFormErrors = {
  email?: string
  password?: string
}

export default function Login() {
  return (
    <div className="form-container">
      <div>
        <h1> Login </h1>
        <p>Enter your details below to login to your account</p>
      </div>

      <div>
        <Form route="session.store">
          {({ errors }) => {
            const formErrors = errors as LoginFormErrors

            return (
              <>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="username"
                    data-invalid={formErrors.email ? "true" : undefined}
                  />
                  {formErrors.email && <div>{formErrors.email}</div>}
                </div>

                <div>
                  <label htmlFor="password">Password</label>
                  <input type="password" name="password" id="password" autoComplete="current-password" />
                  {formErrors.password ? <span>{formErrors.password}</span> : ""}
                </div>

                <div>
                  <button type="submit" className="button">
                    Login
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
