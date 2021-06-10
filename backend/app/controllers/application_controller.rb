class ApplicationController < ActionController::API
    before_action :logged_in?
    
    def encode_token(payload)
        JWT.encode(payload, "Flatiron")
    end

    def logged_in?
        # byebug
        # headers = request.headers["Authorization"]
        # token = headers.split(" ")[1]

        # begin
        #     user_id = JWT.decode(token, "Flatiron")[0]["user_id"]
        #     user = User.find(user_id)
        # rescue
        #     user = nil
        # end

        # unless user
        #     render json: {error: "Please log in!"}
        # end
    end
end
