Basado en: https://www.geeksforgeeks.org/using-jwt-for-user-authentication-in-flask/

si no existe el entorno, instalarlo con:
```bash
python3 -m venv venv
source venv/bin/activate
```
instalar dependencias:
```bash
pip install -r requirements.txt
```

crear una base de datos sqlite para uso en la app, abrir consola de python y ejecutar:
```
from server import app
app.app_context().push()
from server import db
db.create_all()
```

posible error al crear la BD: https://stackoverflow.com/questions/31444036/runtimeerror-working-outside-of-application-context

```sh
export FLASK_APP=server.py
export FLASK_ENV=development
flask run
```