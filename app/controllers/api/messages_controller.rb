class Api::MessagesController < ApplicationController
  def index
    @messages = Group.find(params[:group_id]).messages.where('id > ?',params[:id])
  end
end