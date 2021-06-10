class ClosetsController < ApplicationController
    before_action :find_closet, only: [:show, :update, :destroy]

    def index
        closets = Closet.all
        render json: closets
    end

    def create
        closet = Closet.new(params.permit(:title, :remove_main_image, :main_image))

        if closet.valid?
            closet.save
            render json: closet
        else
            render json: {message: "invalid title"}
        end
    end

    def show
        render json: @closet
    end

    def update
        @closet.update(closet_params)
        render json: @closet
    end

    def destroy
        @closet.destroy
        render json: {message: "closet deleted"}
    end

    private

    def find_closet
        @closet = Closet.find(params[:id])
    end

    def closet_params
        params.require(:closet).permit(:title, :remove_main_image, :main_image)
    end
end
