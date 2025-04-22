FROM node:18-alpine

WORKDIR /app

# Copia package.json e package-lock.json e instala dependências
COPY package*.json ./
RUN npm install --only=production

# Copia o arquivo principal da aplicação
COPY index.js ./

# Expõe a porta em que o app escuta
EXPOSE 5001

# Comando padrão para iniciar a aplicação
CMD ["node", "index.js"]
