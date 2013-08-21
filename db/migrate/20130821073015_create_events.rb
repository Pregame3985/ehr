class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.integer :id
      t.datetime :run_at
      t.string :title

      t.timestamps
    end
  end
end
