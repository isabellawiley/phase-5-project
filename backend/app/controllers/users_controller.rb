require 'open-uri'

class UsersController < ApplicationController
    before_action :find_user, only: [:show, :update, :destroy]
    skip_before_action :logged_in?, only: [:create, :login]

    def index
        users = User.all
        render json: users
    end

    def create
        user = User.new(params.permit(:name, :birthdate, :email, :password))

        if user.valid?
            user.save
            render json: {id: user.id, name: user.name, birthdate: user.birthdate, email: user.email, token: encode_token({user_id: user.id}), total_garments: user.total_garments, total_closets: user.total_closets, garments: user.garments, closets: user.closets, laundry: user.laundry, laundry_weight: user.laundry_weight, default_closet_id: user.default_closet_id, default_closet: user.default_closet, other_closets: user.other_closets, lat: user.lat, lon: user.lon, fav_garments: user.fav_garments}
        else
            render json: {message: "invalid input"}
        end
    end

    def show
        render json: @user
    end

    def update
        @user.update(user_params)
        render json: @user
    end

    def destroy
        if @user.garments.length > 0
            @user.temperature_ranges.destroy_all
            @user.garments.destroy_all
            @user.closets.destroy_all
            @user.destroy
        else
            @user.destroy
        end        
        render json: {message: "User Deleted"}
    end

    def login
        user = User.find_by(email: params[:email])

        if user && user.authenticate(params[:password])
            render json: {id: user.id, name: user.name, birthdate: user.birthdate, email: user.email, token: encode_token({user_id: user.id}), total_garments: user.total_garments, total_closets: user.total_closets, garments: user.garments, closets: user.closets, laundry: user.laundry, laundry_weight: user.laundry_weight, default_closet_id: user.default_closet_id, default_closet: user.default_closet, other_closets: user.other_closets, lat: user.lat, lon: user.lon, fav_garments: user.fav_garments}
        else
            render json: {message: "wrong email and/or password"}
        end
    end

    private

    # def client_ip
    #     open('http://whatismyip.akamai.com').read
    # end

    # def user_lat
    #     address = client_ip
    #     location = Geocoder.search(client_ip)
    #     results = location.first.coordinates
    #     results[0]
    # end

    # def user_lon
    #     address = client_ip
    #     location = Geocoder.search(client_ip)
    #     results = location.first.coordinates
    #     results[1]
    # end

    def find_user
        @user = User.find(params[:id])
    end

    def user_params
        params.require(:user).permit(:name, :birthdate, :email, :password)
    end
end
