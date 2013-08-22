class CreateBoxes < ActiveRecord::Migration
  def change
    create_table :boxes do |t|
      t.integer :id
      t.string :name
      t.string :hash
      t.string :authentication_token
      t.integer :interviewee_id
      t.integer :interviewer_id
      t.integer :hr_id
      t.integer :status
      t.datetime :schedule_time
      t.datetime :start

      t.timestamps
    end
  end
end
