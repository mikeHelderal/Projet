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
                    sh 'npm install'
                }
                dir('front/blog_martinique'){
                    sh 'npm install'
                }
            }
        }
        stage("Run Tests") {
            steps {
                dir('back_projet'){
                    sh 'npm test'
                }
            }
        }
        
    }
}
