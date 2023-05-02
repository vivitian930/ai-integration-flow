FROM node:18-alpine

WORKDIR /app

ARG OPENAI_KEY OPENAI_ORG BASIC_AUTH_TOKEN

ENV OPENAI_KEY=${OPENAI_KEY}
ENV OPENAI_ORG=${OPENAI_ORG}
ENV BASIC_AUTH_TOKEN=${BASIC_AUTH_TOKEN}


# Create a non-root user to run the container
RUN addgroup -g 1001 -S appuser && adduser -u 1001 -S appuser -G appuser

COPY ./package*.json ./

RUN apk update && apk add -u openssl && npm install && chown -R appuser:appuser /app

USER appuser

COPY . .

CMD ["node", "index.js"]