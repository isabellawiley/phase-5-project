class TemperaturesController < ApplicationController

    def index
        temperatures = Temperature.all
        render json: temperatures
    end

    def show
        temperature = Temperature.find(params.require(:temperature).permit(:low_temperature, :high_temperature))
        render json: temperature
    end

end
