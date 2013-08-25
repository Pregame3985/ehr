class CreateInterviewAppointments < ActiveRecord::Migration
  def change
    create_table :interview_appointments do |t|
      t.integer :id
      t.integer :hr_id
      t.integer :interviewer_id
      t.integer :candidate_id
      t.integer :box_id
      t.datetime :start_time
      t.datetime :end_time
      t.integer :result
      t.integer :status

      t.timestamps
    end
  end
end
