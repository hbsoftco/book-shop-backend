pipeline {
    agent any 
    stages {
        stage("Checkout"){
            steps {
                checkout scm
            }
        }

        stage("Test"){
            steps {
                sh 'pwd'
                sh 'echo "test"'
            }
        }

        stage("Build"){
            steps {
                // sh 'npm run build'
                sh 'pwd'
            }
        }

        stage("Build Image"){
            steps {
                sh 'docker build -t book-shop-node-app-sara:1.0 .'
            }
        }
    }
}
