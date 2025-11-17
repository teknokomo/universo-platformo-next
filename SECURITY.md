# Security Policy

## Supported Versions

We release patches for security vulnerabilities in the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 0.x.x   | :white_check_mark: |

## Reporting a Vulnerability

The Universo Platformo Next team takes security bugs seriously. We appreciate your efforts to responsibly disclose your findings and will make every effort to acknowledge your contributions.

### Where to Report

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report security vulnerabilities by emailing:
- **Email**: universo.pro@yandex.com
- **Subject**: [SECURITY] Brief description of the issue

### What to Include

When reporting a vulnerability, please include the following information:

1. **Type of vulnerability** (e.g., SQL injection, XSS, authentication bypass)
2. **Full paths of affected source files**
3. **Location of the affected source code** (tag/branch/commit or direct URL)
4. **Step-by-step instructions to reproduce the issue**
5. **Proof-of-concept or exploit code** (if possible)
6. **Impact of the vulnerability** (what an attacker could do)
7. **Any special configuration required** to reproduce the issue

### Response Timeline

You should expect the following response timeline:

1. **Initial Response**: Within 48 hours of your report, we will acknowledge receipt and provide an initial assessment
2. **Status Update**: Within 7 days, we will provide a detailed response indicating the next steps
3. **Fix Timeline**: We aim to release security patches within 14 days for critical vulnerabilities
4. **Public Disclosure**: After a fix is released, we will publicly disclose the vulnerability details

### Security Patch Process

1. **Verification**: We verify the vulnerability and assess its impact
2. **Development**: We develop and test a fix in a private repository
3. **Release**: We release the security patch
4. **Notification**: We notify affected users and provide upgrade instructions
5. **Disclosure**: We publicly disclose the vulnerability details with credit to the reporter (if desired)

## Security Best Practices

When working with this project, please follow these security best practices:

### Environment Variables

- **Never commit** `.env.local`, `.env.production`, or any files containing secrets
- **Always use** `.env.example` for documenting required variables (without actual values)
- **Use typed environment variables** with validation in TypeScript

### Authentication

- Use **Supabase Auth Helpers** for Next.js authentication
- Implement proper **session management** and validation
- Use **Server Components** for sensitive operations that require authentication
- Protect **API routes** with authentication middleware
- Never expose sensitive user data to client-side code

### Database

- Always use **database abstraction layer** - never write raw SQL in application code
- Use **parameterized queries** to prevent SQL injection
- Implement **row-level security** in Supabase
- Use **SECURITY DEFINER** SQL functions for privileged operations
- Validate and sanitize all user inputs before database operations

### API Security

- Implement **rate limiting** on API endpoints
- Use **CSRF protection** for state-changing operations
- Validate **request origins** and implement CORS properly
- Never expose **internal error details** to clients
- Use **proper HTTP methods** (GET for reads, POST/PUT/DELETE for writes)

### Client-Side Security

- Prevent **XSS attacks** by properly escaping user-generated content
- Use **Content Security Policy** headers
- Implement **proper authorization checks** before rendering sensitive UI
- Never store **sensitive data** in localStorage or sessionStorage
- Use **secure cookies** for session management

### Dependencies

- Run **`pnpm audit`** before every release
- Address **high and critical vulnerabilities** immediately
- Keep dependencies **up to date** with security patches
- Review **new dependencies** for security issues before adding
- Use **exact versions** for critical dependencies

### Code Review

- All code must pass **security review** before merging
- Use the **security review checklist** from the constitution
- Pay special attention to:
  - Authentication and authorization logic
  - Database queries and user input handling
  - Environment variable usage
  - Third-party integrations
  - File upload functionality

## Known Security Considerations

### Next.js Specific

- **Server Components**: Be aware of what data is serialized to the client
- **Server Actions**: Validate all inputs and check authorization
- **Route Handlers**: Always validate authentication before processing
- **Middleware**: Properly implement authentication and authorization
- **Dynamic Routes**: Validate and sanitize route parameters

### Supabase Specific

- **Row-Level Security (RLS)**: Always enable RLS on tables
- **Service Role Key**: Never expose the service role key to clients
- **Anon Key**: Only use anon key for public operations
- **Database Functions**: Use SECURITY DEFINER with caution
- **Storage Policies**: Properly configure storage bucket policies

### TypeScript Specific

- **Type Safety**: Never use `any` type - it bypasses type checking
- **Strict Mode**: Always use TypeScript strict mode
- **Type Guards**: Implement runtime validation for external data
- **Assertion Functions**: Use carefully and only when certain

## Security Tools

We use the following tools to maintain security:

- **pnpm audit**: Dependency vulnerability scanning
- **ESLint**: Static code analysis with security rules
- **TypeScript**: Type safety and compile-time checks
- **Husky**: Pre-commit hooks for security checks
- **GitHub Dependabot**: Automated dependency updates
- **GitHub Security Advisories**: Monitoring for known vulnerabilities

## Contact

For security-related questions or concerns that are not vulnerabilities, you can contact:

- **VK**: [https://vk.com/vladimirlevadnij](https://vk.com/vladimirlevadnij)
- **Telegram**: [https://t.me/Vladimir_Levadnij](https://t.me/Vladimir_Levadnij)
- **Email**: [universo.pro@yandex.com](mailto:universo.pro@yandex.com)

## Acknowledgments

We would like to thank all security researchers who responsibly disclose vulnerabilities to us. We will acknowledge your contribution in our release notes (unless you prefer to remain anonymous).

## License

This security policy is part of the Universo Platformo Next project and follows the same license.
