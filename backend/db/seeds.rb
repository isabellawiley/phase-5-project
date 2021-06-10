# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user1 = User.create(name: "Isa", birthdate: 19990212, email: "wileyisabella@gmail.com", password: "pass")
closet1 = Closet.create(title: "Closet 1")

temperatures = [
    {
        low_temperature: 30,
        high_temperature: 39
    },
    {
        low_temperature: 40,
        high_temperature: 49
    },
    {
        low_temperature: 50,
        high_temperature: 59
    },
    {
        low_temperature: 60,
        high_temperature: 69
    },
    {
        low_temperature: 70,
        high_temperature: 79
    },
    {
        low_temperature: 80,
        high_temperature: 89
    },
    {
        low_temperature: 90,
        high_temperature: 99
    }
]

temperatures.each {|temp| Temperature.create(temp)}

garments = [
    {
        name: "shirt1",
        garment_style: "casual",
        garment_type: "top",
        is_favorite: false,
        is_clean: true,
        user: user1,
        closet: closet1
    },
    {
        name: "shirt2",
        garment_style: "casual",
        garment_type: "top",
        is_favorite: false,
        is_clean: true,
        user: user1,
        closet: closet1
    },
    {
        name: "sweater",
        garment_style: "casual",
        garment_type: "top",
        is_favorite: false,
        is_clean: true,
        user: user1,
        closet: closet1
    },
    {
        name: "pants",
        garment_style: "casual",
        garment_type: "bottoms",
        is_favorite: false,
        is_clean: true,
        user: user1,
        closet: closet1
    },
    {
        name: "shorts",
        garment_style: "casual",
        garment_type: "bottoms",
        is_favorite: false,
        is_clean: true,
        user: user1,
        closet: closet1
    }
]

garments.each do |garm| 
    garment = Garment.create(garm)

    rand(1..3).times do 
        TemperatureRange.create({
            garment: garment,
            temperature: Temperature.all.sample
        })
    end
end