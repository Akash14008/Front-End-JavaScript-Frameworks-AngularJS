'use strict';

angular.module('confusionApp')
        
        .constant("baseURL","http://localhost:3000/")
        
        .service('menuFactory', ['$resource', 'baseURL', function($resource,baseURL) {
    
                this.getDishes = function(){
                    return $resource(baseURL+"dishes/:id",null,  {'update':{method:'PUT' }});
                };

                this.getPromotion = function () {
                    return $resource(baseURL+"promotions/:id",null,  {});  
                    
                };
                        
        }])

        .factory('corporateFactory', ['$resource', 'baseURL', function($resource,baseURL) {
    
            var corpfac = {};

                corpfac.getLeaders = function(){
                        return $resource(baseURL+"leadership/:id",null,  {});
                };

                return corpfac;
    
        }])

        .factory('feedbackFactory', ['$resource', 'baseURL', function($resource,baseURL) {
    
            var fedbckfac = {};

                fedbckfac.getFeedbacks = function(){
                        return $resource(baseURL+"feedback/:id",null,  {});
                };

                return fedbckfac;
    
        }])

;
