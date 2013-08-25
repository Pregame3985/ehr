class CreateInterviewAppointmentReviews < ActiveRecord::Migration
  def change
    create_table :interview_appointment_reviews do |t|
      t.integer :id
      t.integer :interview_appointment_id
      t.string :comment

      t.timestamps
    end
  end
end
