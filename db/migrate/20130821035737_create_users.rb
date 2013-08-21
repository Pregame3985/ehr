class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.integer :id
      t.string :name
      t.string :username
      t.string :password
      t.string :email
      t.integer :gender

      t.timestamps
    end
  end
end
