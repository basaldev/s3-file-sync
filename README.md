# basaldev/s3-file-sync

![CI](https://github.com/basaldev/s3-file-sync/actions/workflows/ci.yml/badge.svg)
[![Check dist/](https://github.com/basaldev/s3-file-sync/actions/workflows/check-dist.yml/badge.svg)](https://github.com/basaldev/s3-file-sync/actions/workflows/check-dist.yml)
[![CodeQL](https://github.com/basaldev/s3-file-sync/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/basaldev/s3-file-sync/actions/workflows/codeql-analysis.yml)
[![Coverage](./badges/coverage.svg)](./badges/coverage.svg)

# S3 File Sync Action

This GitHub Action syncs files from a local directory to an S3 bucket using the
`s3-sync-client` package. It supports excluding and including files based on
patterns and setting custom content types.

## Inputs

- `bucket_name`: The name of the S3 bucket.
- `source_directory`: The local directory to sync.
- `aws_region`: The AWS region of the S3 bucket.
- `aws_access_key_id`: AWS Access Key ID.
- `aws_secret_access_key`: AWS Secret Access Key.
- `aws_session_token`: AWS session token for those using roles/temporary
  credentials for deployment (optional)

## Example Usage

Create a new workflow in `.github/workflows/s3-sync.yml`:

```yaml
name: Sync to S3

on:
  push:
    branches:
      - main

jobs:
  s3_sync:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Run S3 Sync
        uses: basaldev/s3-file-sync@v1
        with:
          bucket_name: ${{ secrets.S3_BUCKET_NAME }}
          source_directory: './dist'
          aws_region: ${{ secrets.AWS_REGION }}
          aws_access_key_id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws_secret_access_key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

## Development

### Prerequisites

- Node.js
- npm

### Installation

Install the dependencies:

```bash
npm install
```

### Building the Action

To build the action, run:

```bash
npm run build
```

### Running the Action Locally

To run the action locally, use:

```bash
npm start
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with
your changes.

## License

This project is licensed under the MIT License.
