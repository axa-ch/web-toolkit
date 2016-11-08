node {
  try {

    def repositoryName = "axacom/ui-toolkit"
    def branchName = env.BRANCH_NAME
    def tagName = branchName != "master" ? branchName : "latest"
    def imageName = repositoryName + ":" + tagName.replaceAll("[.:_/\\\\]", '-')
    def testImageName = repositoryName + "-test" + ":" + tagName.replaceAll("[.:_/\\\\]", '-')
    def projectName = imageName.replaceAll("[.:_/\\\\]", '-')
    def baseUrl = branchName != "master" ? ('/' + tagName.replaceAll("[.:_/\\\\]", '-')) : "/toolkit"

    stage 'Checkout'

    checkout scm

    stage 'Build Docker Image'

    sh """
      set +x
      docker build -t $imageName .
      docker build -t $testImageName ./tests
    """

    stage 'Push Docker Images'

    withCredentials([[
      $class: 'UsernamePasswordMultiBinding',
      credentialsId: 'docker-hub',
      usernameVariable: 'DOCKER_HUB_USERNAME',
      passwordVariable: 'DOCKER_HUB_PASSWORD'
    ]]) {
      sh """
        set +x
        docker login -u \$DOCKER_HUB_USERNAME -p \$DOCKER_HUB_PASSWORD
        docker push $imageName
        docker push $testImageName
      """
    }

    withCredentials([[
      $class: 'UsernamePasswordMultiBinding',
      credentialsId: 'rancher-workspace',
      usernameVariable: 'RANCHER_ACCESS_KEY',
      passwordVariable: 'RANCHER_SECRET_KEY'
    ], [
      $class: 'StringBinding',
      credentialsId: 'rancher-url',
      variable: 'RANCHER_URL'
    ]]) {
      stage 'Deploy Stack'

      sh """
        set +x
        IMAGE=$imageName \
        TEST_IMAGE=$testImageName \
        BASE_URL=$baseUrl \
          rancher-compose \
            --url \$RANCHER_URL \
            --access-key \$RANCHER_ACCESS_KEY \
            --secret-key \$RANCHER_SECRET_KEY \
            --project-name $projectName \
            --verbose up --pull --force-upgrade -d
      """

      stage 'Confirm Upgrade'

      slackSend color: 'warning', message: """
        👆 : `${env.BUILD_TAG}` needs confirmation!

        Please confirm build ${env.BUILD_DISPLAY_NAME} on ${env.BUILD_URL}input
      """.stripIndent()

      def shouldConfirmUpgrade = input([
        id: 'Confirmation',
        message: 'Confirm the Upgrade?',
        parameters: [booleanParam([
          defaultValue: true,
          description: '''
            Select if you want to confirm the upgrade
            and remove the old containers.
            Do not select if you want to rollback
            to the previous container.
          '''.stripIndent(),
          name: 'shouldConfirmUpgrade'
        ])]
      ])

      if (shouldConfirmUpgrade) {
        sh """
          set +x
          IMAGE=$imageName \
          TEST_IMAGE=$testImageName \
          BASE_URL=$baseUrl \
            rancher-compose \
              --url \$RANCHER_URL \
              --access-key \$RANCHER_ACCESS_KEY \
              --secret-key \$RANCHER_SECRET_KEY \
              --project-name $projectName \
              --verbose up --upgrade --confirm-upgrade -d
        """

        slackSend color: 'good', message: """
          👍 : `${env.BUILD_TAG}` was successful and confirmed! :tada:

          Have a look at build ${env.BUILD_DISPLAY_NAME} on ${env.BUILD_URL}console
        """.stripIndent()
      } else {
        sh """
          set +x
          IMAGE=$imageName \
          TEST_IMAGE=$testImageName \
          BASE_URL=$baseUrl \
            rancher-compose \
              --url \$RANCHER_URL \
              --access-key \$RANCHER_ACCESS_KEY \
              --secret-key \$RANCHER_SECRET_KEY \
              --project-name $projectName \
              --verbose up --upgrade --rollback -d
        """

        slackSend color: 'danger', message: """
          👎 : `${env.BUILD_TAG}` was rolled back! 🔙

          See build ${env.BUILD_DISPLAY_NAME} output on ${env.BUILD_URL}console
        """.stripIndent()
      }
    }
  } catch (err) {
    slackSend color: 'danger', message: """
      👎 : `${env.BUILD_TAG}` failed! :scream:

      `${err.message}`

      See what went wrong with build ${env.BUILD_DISPLAY_NAME} on ${env.BUILD_URL}console
    """.stripIndent()

    throw err
  }
}
