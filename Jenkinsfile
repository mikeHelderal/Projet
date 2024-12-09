pipeline {
    agent any   
    parameters {
        stashedFile '.env'
    }
    environment {
        NODE_ENV = 'test'
        GIT_CREDENTIALS_ID = 'CredentialBM' // Remplacez par l'ID de vos credentials Jenkins
    }
    tools{
        nodejs:"NodeJS"
    }
    stages {
        stage('Checkout') {
            steps {
                script {
                    checkout([$class: 'GitSCM', branches: [[name: '*/dev']], 
                            doGenerateSubmoduleConfigurations: false, 
                            extensions: [], submoduleCfg: [], 
                            userRemoteConfigs: [[credentialsId: env.GIT_CREDENTIALS_ID, url: 'https://github.com/mikeHelderal/Projet.git']]])
                }
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
                script {
                    dir('back_projet') {
                        bat 'npm install'
                    }
                    dir('front/blog_martinique') {
                        bat 'npm install'
                    }
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    dir('front/blog_martinique') {
                        echo 'sur le front'                        
                    }
                    dir('back_projet') {
                        echo 'sur le back'
                        bat 'npm test'
                    }
                }
            }
        }        
    }   
    post {
        success {
            script {
                checkout([$class: 'GitSCM', branches: [[name: '*/dev']], 
                              doGenerateSubmoduleConfigurations: false, 
                              extensions: [], submoduleCfg: [], 
                              userRemoteConfigs: [[credentialsId: env.GIT_CREDENTIALS_ID, url: 'https://github.com/mikeHelderal/Projet.git']]])
                echo 'Tests succeeded, merging dev into main'
                withCredentials([usernamePassword(credentialsId: env.GIT_CREDENTIALS_ID, passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
                    bat """
                        git config --global user.email "mike.helderal.sio@gmail.com"
                        git config --global user.name "mikeHelderal"
                        git checkout main
                        git pull origin main
                        git merge origin/dev
                        git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/mikeHelderal/Projet.git main
                    """
                }
            }
        }
        failure {
            echo 'Tests failed, merge to main aborted.'
        }
        always {
            echo 'Cleaning up workspace'
            cleanWs()
        }
    }
}