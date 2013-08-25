class InterviewAppointmentReview < ActiveRecord::Base
  attr_accessible :id, :interview_appointment_id, :comment

  belongs_to :interview_appointment
end
