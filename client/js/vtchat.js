        function ChatController($scope) {
          var socket = io.connect();

          $scope.messages = [];
          $scope.messages2 = [];
          $scope.roster = [];
          $scope.name = '';
          $scope.text = '';
          $scope.text2 = '';

          socket.on('connect', function () {
            $scope.setName();
          });

          socket.on('message', function (msg) {
            // 一旦クリア
            $scope.messages = [];
            $scope.messages.push(msg);
            $scope.$apply();
          });
          socket.on('message2', function (msg) {
            // 一旦クリア
            $scope.messages2 = [];
            $scope.messages2.push(msg);
            $scope.$apply();
          });

          socket.on('roster', function (names) {
            $scope.roster = names;
            $scope.$apply();
          });

          $scope.send = function send() {
  //          console.log('Sending message:', $scope.text);
            if ( $scope.text ){
              socket.emit('message', $scope.text);
              $scope.text = '';
            }
            if ( $scope.text2 ){
              socket.emit('message2', $scope.text2);
              $scope.text2 = '';
            }
          };

          $scope.setName = function setName() {
            socket.emit('identify', $scope.name);
          };
        }
