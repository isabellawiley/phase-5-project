class CreateWeathers < ActiveRecord::Migration[6.1]
  def change
    create_table :weathers do |t|
      t.string :name
      t.string :icon

      t.timestamps
    end
  end
end
