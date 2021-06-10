class GarmentsController < ApplicationController
    before_action :find_garment, only: [:show, :update, :destroy]

    def index
        garments = Garment.all
        render json: garments
    end

    def create
        garment = Garment.new(params.permit(:name, :garment_style, :garment_type, :is_favorite, :is_clean, :user_id, :closet_id, :remove_main_image, :main_image, :lowest_temp, :highest_temp))

        if garment.valid?
            garment.save
            render json: garment
        else
            render json: {message: "invalid input"}
        end
    end

    def show
        render json: @garment
    end

    def update
        @garment.update(garment_params)
        render json: @garment
    end

    def destroy
        @garment.destroy
        render json: {message: "garment deleted"}
    end
    
    private

    def find_garment
        @garment = Garment.find(params[:id])
    end

    def garment_params
        params.require(:garment).permit(:name, :garment_style, :garment_type, :is_favorite, :is_clean, :user_id, :closet_id, :remove_main_image, :main_image, :lowest_temp, :highest_temp)
    end
end
