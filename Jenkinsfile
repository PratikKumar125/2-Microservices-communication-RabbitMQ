pipeline {
    agent {
        docker { image 'node:latest' }
    }
    stages {
        stage('Fetch code') {
            steps {
                bat 'git clone https://github.com/PratikKumar125/2-Microservices-communication-RabbitMQ.git'
            }
        }
        stage('Build app') {
            steps {
                bat 'npm install'
            }
        }
        stage('Test app') {
            steps {
                bat 'npm test'
            }
        }
        stage('Build Docker image') {
            steps {
                def tag = ""
                bat "docker build -t jenkins:${env.BUILD_NUMBER} ."
            }
        }
        stage('Push Docker image') {
            steps {
                withCredentials([string(credentialsId: 'DOCKER-CREDS', variable: 'DOCKERHUB_CREDENTIALS')]) {
                    bat "docker login -u pratikkumar378 -p %DOCKERHUB_CREDENTIALS% && docker push jenkins:${env.BUILD_NUMBER}"
                }
            }
        }
    }
}
