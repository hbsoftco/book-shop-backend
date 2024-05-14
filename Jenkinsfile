pipeline {
    agent any 
    stages {
        stage('Front-end') {
            agent {
                docker { image 'node:20.11.1-alpine3.19' }
            }
            steps {
                sh 'node --version'
            }
        }
    }
}
