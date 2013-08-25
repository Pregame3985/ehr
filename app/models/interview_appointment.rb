class InterviewAppointment < ActiveRecord::Base
  attr_accessible :id, :hr_id, :interviewer_id, :candidate_id,
    :box_id, :start_time, :end_time, :result, :status

  has_many :interview_appointment_reviews
end
