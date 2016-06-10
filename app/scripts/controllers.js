'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
            
            $scope.showMenu = false;
            $scope.message = "Loading ...";
            menuFactory.getDishes().query(
                function(response) {
                    $scope.dishes = response;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                });

            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" , id:0};
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope, feedbackFactory) {
            
            $scope.sendFeedback = function() {
                
                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    feedbackFactory.getFeedbacks().save($scope.feedback, function(){});
                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" , id:0};
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
        
            $scope.dish = {};
            $scope.showDish = false;
            $scope.message="Loading ...";
            $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
            .$promise.then(
                            function(response){
                                $scope.dish = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
            );
        
        }])

        .controller('DishCommentController', ['$scope', 'menuFactory', function($scope,menuFactory) {
            
            $scope.ratings = [1, 2, 3, 4, 5];
            $scope.comment = {Name:"", rating:5, Comments:""};
            
            $scope.submitComment = function () {

                $scope.dish.comments.push({
                                   rating:$scope.comment.rating,
                                   comment:$scope.comment.Comments,
                                   author:$scope.comment.Name,
                                   date:new Date().toISOString()
                               });
                
                menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
                
                $scope.commentForm.$setPristine();
                $scope.comment = {Name:"", rating:5, Comments:""};
                
            };
        }])

        .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function($scope, menuFactory, corporateFactory) {
        
            $scope.dish = {};
            $scope.showDish = false;
            $scope.dishMessage="Loading ...";
            $scope.dish = menuFactory.getDishes().get({id:0})
            .$promise.then(
                            function(response){
                                $scope.dish = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.dishMessage = "Error: "+response.status + " " + response.statusText;
                            }
            );

            $scope.promotion = {};
            $scope.showPromotion = false;
            $scope.promotionMessage="Loading ...";
            $scope.promotion = menuFactory.getPromotion().get({id:0})
            .$promise.then(
                            function(response){
                                $scope.promotion = response;
                                $scope.showPromotion = true;
                            },
                            function(response) {
                                $scope.promotionMessage = "Error: "+response.status + " " + response.statusText;
                            }
            );

            $scope.leader = {};
            $scope.showLeader = false;
            $scope.leaderMessage="Loading ...";
            $scope.leader = corporateFactory.getLeaders().get({id:3})
            .$promise.then(
                            function(response){
                                $scope.leader = response;
                                $scope.showLeader = true;
                            },
                            function(response) {
                                $scope.leaderMessage = "Error: "+response.status + " " + response.statusText;
                            }
            );

        }])

        .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {

            $scope.showLeader = false;
            $scope.leaderMessage = "Loading ...";
            corporateFactory.getLeaders().query(
                function(response) {
                    $scope.leaders = response;
                    $scope.showLeader = true;
                },
                function(response) {
                    $scope.leaderMessage = "Error: "+response.status + " " + response.statusText;
                });

        }])

;
