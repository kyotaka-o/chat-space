class Api::MessagesController < ApplicationController
  def index
    @messages = Message.where('(group_id = ?) and (id > ?)', params[:group_id], params[:id])
  end
end