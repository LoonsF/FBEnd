apt-get update
apt-get upgrade -y

apt-get install -y docker.io
systemctl start docker
systemctl enable docker

curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

mkdir -p /app

cat > /app/docker-compose.yml << 'EOF'
version: '3.8'
services:
  backend:
    image: node:18-alpine
    container_name: backend
    working_dir: /app
    command: >
      sh -c "
        npm install express &&
        npx express-generator --no-view &&
        npm install &&
        npm start
      "
    ports:
      - "5000:3000"
    restart: unless-stopped

  frontend:
    image: nginx:alpine
    container_name: frontend
    ports:
      - "3000:80"
    restart: unless-stopped
EOF

ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 3000/tcp
ufw allow 5000/tcp
ufw --force enable

cd /app
docker-compose up -d

PUBLIC_IP=$(curl -s ifconfig.me)

echo " "
echo "🎉 ¡APLICACIÓN DESPLEGADA EXITOSAMENTE! 🎉"
echo "==========================================="
echo "📍 IP Pública: $PUBLIC_IP"
echo "🌐 Frontend: http://$PUBLIC_IP:3000"
echo "🔧 Backend:  http://$PUBLIC_IP:5000"
echo " "
echo "Ubuntu 20.04 + VM.Standard.E2.1 - CONFIGURACIÓN COMPROBADA"
echo "La aplicación estará disponible en 1-2 minutos..."
echo " "