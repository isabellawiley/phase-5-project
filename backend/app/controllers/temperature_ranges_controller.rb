class TemperatureRangesController < ApplicationController

    def index
        temperature_ranges = TemperatureRange.all
        render json: temperature_ranges
    end

    def create
        temperature_range = TemperatureRange.new(params.permit(:garment_id, :temperature_id))

        if temperature_range.valid?
            temperature_range.save
            render json: temperature_range
        else
            render json: {message: "already created"}
        end
    end

    def destroy
        temperature_range = TemperatureRange.find(params[:id])
        temperature_range.destroy
        render json: {message: "temperature range deleted"}
    end

end
