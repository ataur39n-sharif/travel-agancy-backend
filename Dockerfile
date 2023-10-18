FROM node:18

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN yarn
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

# Set the working directory to the src directory
WORKDIR /app/src

# for typescript build

WORKDIR /app

EXPOSE 5000
CMD ["yarn" ,"start"]