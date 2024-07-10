pipeline {
    agent any
    
    tools{
        nodejs "nodeJS"
    }

    stages {
        stage('Git Checkout') {
            steps {
                git branch: 'dev', url: 'https://github.com/mikeHelderal/Projet.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                dir('back_projet'){
                    bat 'npm install'
                }
                dir('front/blog_martinique'){
                    bat 'npm install'
                }
            }
        }
        stage("Run Tests") {
            steps {
                dir('back_projet'){
                    bat 'npm test'
                }
            }
        }
        stage("Run app") {
            steps {
                dir('back_projet'){
                    bat 'npm start'
                } 
                dir('front/blog_martinique'){
                    bat 'npm run dev'
                }               
            }
        }
    }
}
