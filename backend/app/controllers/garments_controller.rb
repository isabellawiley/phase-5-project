class GarmentsController < ApplicationController
    before_action :find_garment, only: [:show, :update, :destroy]

    def index
        garments = Garment.all
        render json: garments
    end

    def create
        garment = Garment.create(params.permit(:name, :garment_style, :garment_type, :is_favorite, :closet_id))

        # garment.save
        # garment.temperatures.map {|temp| TemperatureRange.create({garment: garment, temperature: temp})}
        render json: {id: garment.id, name: garment.name, garment_style: garment.garment_style, garment_type: garment.garment_type, is_favorite: garment.is_favorite, is_clean: garment.is_clean, closet_id: garment.closet_id, temperatures: garment.temperatures, user: garment.user, lowest_temp: garment.lowest_temp, highest_temp: garment.highest_temp}
        # if garment.valid?
        #     garment.save
        #     garment.temperatures.each {|temp| TemperatureRange.create({garment: garment, temperature: temp})}
        #     render json: garment
        # else
        #     render json: {message: "invalid input"}
        # end
    end

    def show
        render json: @garment
    end

    def update
        @garment.update(garment_params)
        render json: @garment
    end

    def destroy
        @garment.temperature_ranges.destroy_all
        @garment.destroy
        render json: {message: "garment deleted"}
    end
    
    private

    def find_garment
        @garment = Garment.find(params[:id])
    end

    def garment_params
        params.require(:garment).permit(:name, :garment_style, :garment_type, :is_favorite, :is_clean, :closet_id )
    end
end
