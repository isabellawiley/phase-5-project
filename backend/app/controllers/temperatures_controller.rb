class TemperaturesController < ApplicationController

    def index
        temperatures = Temperature.all
        render json: temperatures
    end

    def show
        temperature = Temperature.find(params[:id])
        render json: temperature
    end

end
