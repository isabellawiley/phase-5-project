class WeathersController < ApplicationController

    def index
        weathers = Weather.all
        render json: weathers
    end

    def show
        weather = Weather.find(params[:id])
        render json: weather
    end
end
