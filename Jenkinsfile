pipeline {
    agent {
        docker { image 'node:latest' 
                 args '-v C:/Users/prate/.jenkins/workspace/docker-push:/app'}
        
    }
    stages {
        stage('Fetch code') {
            environment {
                  HOME="."
            }
            steps {
                bat 'git clone https://github.com/PratikKumar125/2-Microservices-communication-RabbitMQ.git'
            }
        }
        stage('Build app') {
            environment {
                  HOME="."
            }
            steps {
                bat 'npm install'
            }
        }
        stage('Test app') {
            environment {
                  HOME="."
            }
            steps {
                bat 'npm test'
            }
        }
        stage('Build Docker image') {
            environment {
                  HOME="."
            }
            steps {
                bat "docker build -t jenkins:${env.BUILD_NUMBER} ."
            }
        }
        stage('Push Docker image') {
            environment {
                  HOME="."
            }
            steps {
                withCredentials([string(credentialsId: 'DOCKER-CREDS', variable: 'DOCKERHUB_CREDENTIALS')]) {
                    bat "docker login -u pratikkumar378 -p %DOCKERHUB_CREDENTIALS% && docker push jenkins:${env.BUILD_NUMBER}"
                }
            }
        }
    }
}
