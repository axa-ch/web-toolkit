node {
  stage('Checkout') {
    checkout scm
  }

  if (env.BRANCH_NAME == "feature/forms") {
    stage('Deploy') {
      withCredentials([[
        $class: 'UsernamePasswordMultiBinding',
        credentialsId: 'rancher-workspace',
        usernameVariable: 'RANCHER_ACCESS_KEY',
        passwordVariable: 'RANCHER_SECRET_KEY'
      ], [
        $class: 'UsernamePasswordMultiBinding',
        credentialsId: 'amazon-s3',
        usernameVariable: 'AWS_ACCESS_KEY_ID',
        passwordVariable: 'AWS_SECRET_ACCESS_KEY'
      ], [
        $class: 'StringBinding',
        credentialsId: 'rancher-url',
        variable: 'RANCHER_URL'
      ]]) {
        sh """
          set +x
          export BASE_URL=/toolkit/forms

          rancher-compose \
            --file docker-compose.yml \
            --url \$RANCHER_URL \
            --access-key \$RANCHER_ACCESS_KEY \
            --secret-key \$RANCHER_SECRET_KEY \
            --project-name "web-toolkit-v2" \
            --verbose up -d --confirm-upgrade
          rancher-compose \
            --file docker-compose.yml \
            --url \$RANCHER_URL \
            --access-key \$RANCHER_ACCESS_KEY \
            --secret-key \$RANCHER_SECRET_KEY \
            --project-name "web-toolkit-v2" \
            --verbose up -d --upgrade
        """
      }
    }
  } else {
    stage('Build') {
      sh """
        set +x
        export BASE_URL=/

        docker-compose \
          --file docker-compose.test.yml \
          --verbose build web-toolkit
      """
    }
  }
}
