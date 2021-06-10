class CreateTemperatures < ActiveRecord::Migration[6.1]
  def change
    create_table :temperatures do |t|
      t.integer :low_temperature
      t.integer :high_temperature

      t.timestamps
    end
  end
end
