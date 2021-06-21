class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :name
      t.date :birthdate
      t.string :email
      t.string :password_digest
      t.integer :default_closet_id

      t.timestamps
    end
  end
end
