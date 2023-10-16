# Setup

1. Change directory in backend
2. Setup virtual environment (For windows: `python -m venv be_venv`)
3. Add `.env` file in backend folder
4. Activate virtual environment: `be_venv\Scripts\activate `
   For Mac: `source ./be_venv/bin/activate`
5. Install packages via `python -m pip install -r requirements.txt`

## Redeploy code updates to Azure Container Apps

Ref: [Azure Docs](https://learn.microsoft.com/en-us/azure/developer/python/tutorial-containerize-simple-web-app?tabs=web-app-flask#make-updates-and-redeploy)

Prerequisites:

- Install Azure CLI [here](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli)

Open Powershell:

1. `cd .\backend\`
2. `az login`
3. Run the following command with the environment variables manually populated:

```powershell
az containerapp up `
  --resource-group htx --name gang-of-four-backend `
  --ingress external --target-port 50505 --source . `
  --env-vars user="<user>" password="<password>" host="<host>" port="<port>" database="<database>" sas_url="<sas_url>" container_name="<container_name>" vapid_private_key="<vapid_private_key>"
```
