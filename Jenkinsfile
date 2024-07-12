pipeline {
    agent any
    
    parameters {
        stashedFile '.env'
    }
    
    tools{
        nodejs "NodeJS"
    }

    stages {
        stage('Git Checkout') {
            steps {
                git branch: 'dev', url: 'https://github.com/mikeHelderal/Projet.git'
            }
        }
        stage('Import .env') {
           steps {
                dir('back_projet') {
                    unstash '.env'
                }
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
        
    }
    post {
        success {
                script { // script pour fusionner les branches 

                    bat  """ echo code pour merger sur main  """  
                }
                always {// nettoyage d
                        cleanWs()
                }
        }
    }
}
