# Dockerfile simplificado para FastAPI
FROM python:3.11-slim-bookworm


# Instalar dependencias de sistema necesarias y crear usuario no root en una sola instrucción RUN
RUN apt-get update \
    && apt-get install --no-install-recommends -y build-essential \
    && rm -rf /var/lib/apt/lists/* \
    && useradd --create-home --shell /bin/bash appuser
WORKDIR /home/appuser

# Copiar dependencias y código fuente
COPY requirements.txt .
RUN pip install --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt
COPY . .

# Cambiar permisos para el usuario no root
RUN chown -R appuser:appuser /home/appuser
USER appuser

# Exponer puerto
EXPOSE 8000

# Comando de arranque
ENTRYPOINT ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]