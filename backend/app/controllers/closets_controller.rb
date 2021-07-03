class ClosetsController < ApplicationController
    before_action :find_closet, only: [:show, :update, :destroy]

    def index
        closets = Closet.all
        render json: closets
    end

    def create
        closet = Closet.create(params.permit(:title, :user_id, :image))

        render json: {id: closet.id, title: closet.title, user_id: closet.user_id, image: closet.image, total_garments: closet.total_garments}
        # if closet.valid?
        #     closet.save
        # else
        #     render json: {message: "invalid title"}
        # end
    end

    def show
        render json: @closet
    end

    def update
        @closet.update(closet_params)
        render json: @closet
    end

    def destroy
        if @closet.garments.count < 0
            @closet.garments.temperature_ranges.destroy_all
            @closet.garments.destroy_all
            @closet.destroy
        else
            @closet.destroy
        end                 
        render json: {message: "closet deleted"}
    end

    private

    def find_closet
        @closet = Closet.find(params[:id])
    end

    def closet_params
        params.require(:closet).permit(:title, :user_id, :image)
    end
end
