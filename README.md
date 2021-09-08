# from-gsm-to-ga

Modified version of [google-github-actions/get-secretmanager-secrets](https://github.com/google-github-actions/get-secretmanager-secrets) for my use case

## use case ?

- Some of my project have one Google Secrets per environement
- Each Google Secret contains all the credientals and variables for each environment

Example for the Staging environment Google Secret:

```dot
PROJECT_ID=3892389328238322812121
PROJECT_PASSWORD=dwjdjeiwdjiwdjweiwjidwc
RECAPTCHA_KEY=320239e329e32ei23i230e93023
```

## github actions

- It imports one single google secret
- It set a new secret for each credential in this single google secret
- The secrets only live in the google actions run
- Each secret is masked from the log

## Example:

```yaml
name: testing-after-publishing
on:
  push:
    branches:
      - 'master'
jobs:
  testing-after-publishing:
    name: from-gsm-to-ga
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: google-github-actions/setup-gcloud@master
        with:
          version: '290.0.1'
          service_account_key: ${{ secrets.GCP_KEY }}
          project_id: ${{ secrets.GCP_PROJECT_NAME }}
          export_default_credentials: true
      - id: secrets
        name: get secrets
        uses: komondor/from-gsm-to-ga@v0.1
        with:
          secrets: ${{ secrets.GCP_PROJECT_NAME }}/DEV_CREDENTIALS
      - name: get output
        run: echo '${{ steps.secrets.outputs.PROJECT_NAME}}'
      - name: login
        run: ./a_script.sh
        env:
          PASSOWRD: ${{steps.secrets.outputs.PROJECT_PASSWORD}}
```

## references

- https://github.com/google-github-actions/get-secretmanager-secrets
