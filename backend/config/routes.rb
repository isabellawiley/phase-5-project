Rails.application.routes.draw do
  resources :weathers, only: [:index, :show]
  resources :temperature_ranges, only: [:index, :create, :destroy]
  resources :temperatures, only: [:index, :show]
  resources :closets, only: [:index, :create, :show, :update, :destroy]
  resources :garments, only: [:index, :create, :show, :update, :destroy]
  resources :users, only: [:index, :create, :show, :update, :destroy]
  post "/login", to: "users#login"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
