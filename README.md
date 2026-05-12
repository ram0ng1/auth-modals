<p align="center">
  <img src="icon.svg" width="80" alt="Auth Modals">
  <h1 align="center">Auth Modals</h1>
</p>

<p align="center">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square">
  <a href="https://packagist.org/packages/ramon/auth-modals">
    <img alt="Latest Stable Version" src="https://img.shields.io/packagist/v/ramon/auth-modals.svg?style=flat-square">
  </a>
  <a href="https://packagist.org/packages/ramon/auth-modals">
    <img alt="Total Downloads" src="https://img.shields.io/packagist/dt/ramon/auth-modals.svg?style=flat-square">
  </a>
  <a href="https://github.com/ram0ng1/auth-modals/releases/latest">
    <img alt="GitHub Release" src="https://img.shields.io/github/v/release/ram0ng1/auth-modals?style=flat-square&label=release&color=success">
  </a>
  <a href="https://donate.stripe.com/fZe5o66nebkf39S28a">
    <img alt="Donate" src="https://img.shields.io/badge/donate-stripe-%236772E5?style=flat-square">
  </a>
</p>

<p align="center">
  Redesigns <a href="https://flarum.org">Flarum</a>'s login, sign-up and forgot-password modals with a custom side panel (background image + contextual icon), and optionally adds pill-shaped Log In / Sign Up buttons to the header for guests.
</p>

---

## Features

- **Side panel** — Injected into the Log In, Sign Up and Forgot Password modals, with a contextual Font Awesome icon (lock / user-plus / envelope).
- **Custom background image** — Upload any image from the admin panel; rendered as a `cover` background on the right-side panel.
- **Header buttons** — Optional pill-shaped Log In / Sign Up buttons in the header secondary nav for guests, with an "or" separator.
- **Colored-header aware** — Buttons automatically swap to readable contrast when the forum uses a colored header.
- **Dark mode** — Styles included; borders and surfaces adapt to the active theme.
- **Auto-save** — Settings persist on every change; no submit button on the extension page.

## Requirements

- Flarum `^2.0.0`

## Installation

```sh
composer require ramon/auth-modals
php flarum cache:clear
```

Then enable **Auth Modals** under the *Extensions* page in the admin panel.

## Updating

```sh
composer update ramon/auth-modals --with-dependencies
php flarum cache:clear
```

## Configuration

All settings are available in the admin panel under the Auth Modals extension:

| Setting | Description | Default |
|---|---|---|
| Modal background | Image rendered on the right-side panel of the auth modals | — |
| Header buttons | Show pill-shaped Log In / Sign Up buttons in the header for guests | `false` |

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth-modals/image` | Upload the modal background image (admin only) |
| `DELETE` | `/api/auth-modals/image` | Remove the modal background image (admin only) |

## Build

```sh
cd js
npm install
npm run build
```

## Links

- [GitHub](https://github.com/ram0ng1/auth-modals)
- [Issues](https://github.com/ram0ng1/auth-modals/issues)
- [Donate](https://donate.stripe.com/fZe5o66nebkf39S28a)

## Authors

- [Ramon Guilherme](https://ramonguilherme.com.br)

## License

[MIT](LICENSE.md)
