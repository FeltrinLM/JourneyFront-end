# -----------------------------------------------------------------------------
# ESTÁGIO 1: Build (A Fábrica)
# Usamos uma imagem Node recente para suportar o Angular 20
# -----------------------------------------------------------------------------
FROM node:22-alpine AS build

WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todo o código fonte
COPY . .

# Roda o build de produção
RUN npm run build -- --configuration production

# -----------------------------------------------------------------------------
# ESTÁGIO 2: Runtime (O Servidor)
# Usamos Nginx para servir os arquivos estáticos (muito leve)
# -----------------------------------------------------------------------------
FROM nginx:alpine

# Remove a configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia a nossa configuração personalizada (que criamos no passo 1)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos gerados pelo build do Angular para a pasta do Nginx
# ATENÇÃO: O Application Builder do Angular novo cria uma subpasta /browser
COPY --from=build /app/dist/JourneyFront-end/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
